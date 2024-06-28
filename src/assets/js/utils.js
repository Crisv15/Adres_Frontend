//Validate text
export function validateText(data) {
    return /^[a-zA-Z]*$/.test(data);
}
  
  // Check numbers format
export function checkNumber(data) {
    return /^\d*$/.test(data);
}
  
// Check texts format
export function checkText(data) {
   return /^[\sa-zA-ZñÑáéíóúÁÉÍÓÚ]{3,50}$/.test(data);
}
  
export function checkStatus(data) {
    return data === 'true' || data === 'false';
}