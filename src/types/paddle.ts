export type Price = {
  id: string
  billing_cycle: { interval: string; frequency: number }
  custom_data: Partial<{ tier: string, discount_percentage: string }>
  description: string
  product_id: string
  quantity: { minimum: number; maximum: number }
  trial_period: { interval: string; frequency: number }
  unit_price: { amount: string; currency_code: string }
}
