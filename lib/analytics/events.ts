export const ANALYTICS_EVENTS = {
  whatsappClick: "whatsapp_click",
  productView: "product_view",
  inquirySubmitted: "inquiry_submitted",
} as const;

export type AnalyticsEventName =
  (typeof ANALYTICS_EVENTS)[keyof typeof ANALYTICS_EVENTS];

export type AnalyticsPayload = {
  name: AnalyticsEventName;
  props?: Record<string, string | number | boolean | null | undefined>;
  path?: string;
};
