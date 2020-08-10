//-- Função simples apenas apra validar se a Data existe.
export default function ValidDate(data:string):boolean{
  try { 
    const newDate = new Date(data)
    return true
  } catch (error) {
    return false
  }
}