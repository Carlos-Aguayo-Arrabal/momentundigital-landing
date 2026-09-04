/**
 * CRM gratuito para MOMENTUNDIGITAL.
 * 1. Crea una hoja llamada "Leads".
 * 2. Extensiones > Apps Script y pega este archivo.
 * 3. Implementar > Nueva implementación > Aplicación web.
 * 4. Ejecutar como tú y acceso: cualquiera.
 * 5. Copia la URL /exec en Hostinger como LEADS_WEBHOOK_URL.
 */
function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents || '{}');
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Leads') || SpreadsheetApp.getActiveSpreadsheet().insertSheet('Leads');
    if (sheet.getLastRow() === 0) sheet.appendRow(['Fecha', 'Estado', 'Nombre', 'Email', 'Teléfono', 'Tipo de proyecto', 'Fuente', 'Medio', 'Campaña', 'Página de entrada', 'Mensaje']);
    var attribution = data.attribution || {};
    sheet.appendRow([new Date(data.created_at || Date.now()), data.status || 'nuevo', data.name || '', data.email || '', data.phone || '', data.projectType || '', attribution.source || '', attribution.medium || '', attribution.campaign || '', attribution.landingPath || '', data.message || '']);
    return ContentService.createTextOutput(JSON.stringify({ ok: true })).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ ok: false })).setMimeType(ContentService.MimeType.JSON);
  }
}
