const formatDate = (value: Date): any => {
    return Intl.DateTimeFormat('pt-BR').format(new Date(value));
}
  
export default formatDate;