import { NativeModules, Platform } from 'react-native';

interface BestCard {
  name: string;
  bank: string;
  rewardRate: number;
  category: string;
  color: string;
}

interface WidgetData {
  bestCard: BestCard;
  monthlyRewards: number;
  totalRewards: number;
  lastUpdated: string;
}

class WidgetDataManager {
  private static instance: WidgetDataManager;
  private readonly suiteName = 'group.com.davidgoren.maxrewards';

  private constructor() {}

  static getInstance(): WidgetDataManager {
    if (!WidgetDataManager.instance) {
      WidgetDataManager.instance = new WidgetDataManager();
    }
    return WidgetDataManager.instance;
  }

  /**
   * Updates widget data that will be displayed in the iOS widget
   */
  async updateWidgetData(data: WidgetData): Promise<boolean> {
    if (Platform.OS !== 'ios') {
      console.log('Widget data sharing only available on iOS');
      return false;
    }

    try {
      // Use UserDefaults to share data with widget
      const { UserDefaultsModule } = NativeModules;
      
      if (UserDefaultsModule) {
        // Save best card data
        await UserDefaultsModule.setObjectForKey(
          JSON.stringify(data.bestCard),
          'bestCard',
          this.suiteName
        );

        // Save rewards data
        await UserDefaultsModule.setDoubleForKey(
          data.monthlyRewards,
          'monthlyRewards',
          this.suiteName
        );

        await UserDefaultsModule.setDoubleForKey(
          data.totalRewards,
          'totalRewards',
          this.suiteName
        );

        await UserDefaultsModule.setStringForKey(
          data.lastUpdated,
          'lastUpdated',
          this.suiteName
        );

        // Refresh widget timeline
        await this.reloadWidgetTimeline();
        
        console.log('Widget data updated successfully');
        return true;
      } else {
        console.warn('UserDefaultsModule not available');
        return false;
      }
    } catch (error) {
      console.error('Failed to update widget data:', error);
      return false;
    }
  }

  /**
   * Updates the best card recommendation for the widget
   */
  async updateBestCard(bestCard: BestCard): Promise<void> {
    const currentData = await this.getCurrentWidgetData();
    await this.updateWidgetData({
      ...currentData,
      bestCard,
      lastUpdated: new Date().toISOString(),
    });
  }

  /**
   * Updates rewards data for the widget
   */
  async updateRewards(monthlyRewards: number, totalRewards: number): Promise<void> {
    const currentData = await this.getCurrentWidgetData();
    await this.updateWidgetData({
      ...currentData,
      monthlyRewards,
      totalRewards,
      lastUpdated: new Date().toISOString(),
    });
  }

  /**
   * Gets current widget data (fallback values if not set)
   */
  private async getCurrentWidgetData(): Promise<WidgetData> {
    // Return default data - in a real app, you'd load this from your app state
    return {
      bestCard: {
        name: 'Chase Sapphire Preferred',
        bank: 'Chase',
        rewardRate: 3.0,
        category: 'Dining',
        color: '#1e40af',
      },
      monthlyRewards: 127,
      totalRewards: 2847,
      lastUpdated: new Date().toISOString(),
    };
  }

  /**
   * Forces widget to refresh its timeline
   */
  private async reloadWidgetTimeline(): Promise<void> {
    try {
      const { WidgetCenterModule } = NativeModules;
      if (WidgetCenterModule) {
        await WidgetCenterModule.reloadTimelines('MaxRewardsWidget');
      }
    } catch (error) {
      console.log('Widget timeline reload not available:', error);
    }
  }

  /**
   * Updates widget with data from your app state
   * Call this whenever relevant data changes in your app
   */
  async syncWithAppData(appData: {
    bestCard?: BestCard;
    monthlyRewards?: number;
    totalRewards?: number;
  }): Promise<void> {
    const currentData = await this.getCurrentWidgetData();
    
    const updatedData: WidgetData = {
      bestCard: appData.bestCard || currentData.bestCard,
      monthlyRewards: appData.monthlyRewards || currentData.monthlyRewards,
      totalRewards: appData.totalRewards || currentData.totalRewards,
      lastUpdated: new Date().toISOString(),
    };

    await this.updateWidgetData(updatedData);
  }
}

export default WidgetDataManager;