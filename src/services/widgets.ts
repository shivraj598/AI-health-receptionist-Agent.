export function generateWidgetScript(businessId: string) {
  return `
    <script>
      (function() {
        // Widget script for business: ${businessId}
      })();
    </script>
  `
}
