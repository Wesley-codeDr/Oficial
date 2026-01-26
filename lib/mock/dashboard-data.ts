/**
 * Dashboard Mock Data
 *
 * Mock data for dashboard charts and metrics
 */

export interface ChartDataPoint {
  value: number
}

export const CHART_DATA = {
  orange: [
    { value: 12 },
    { value: 18 },
    { value: 15 },
    { value: 25 },
    { value: 32 },
    { value: 45 },
    { value: 38 },
    { value: 50 },
    { value: 42 },
  ] as ChartDataPoint[],
  
  blue: [
    { value: 30 },
    { value: 25 },
    { value: 35 },
    { value: 30 },
    { value: 45 },
    { value: 35 },
    { value: 55 },
    { value: 50 },
    { value: 60 },
  ] as ChartDataPoint[],
  
  green: [
    { value: 20 },
    { value: 25 },
    { value: 30 },
    { value: 28 },
    { value: 35 },
    { value: 45 },
    { value: 40 },
    { value: 48 },
    { value: 55 },
  ] as ChartDataPoint[],
  
  purple: [
    { value: 65 },
    { value: 58 },
    { value: 62 },
    { value: 55 },
    { value: 50 },
    { value: 45 },
    { value: 48 },
    { value: 42 },
    { value: 40 },
  ] as ChartDataPoint[],
} as const
