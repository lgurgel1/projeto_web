const handleDelete = (reservationId) => {
  if (window.confirm('Tem certeza que deseja excluir esta reserva?')) {
    // exclusão
    alert('Reserva excluída com sucesso!');
  }
};

const handleEdit = (reservationId) => {
  // edição
  alert('Reserva editada com sucesso!');
};

const handleSave = () => {
  // salvamento
  alert('Reserva salva com sucesso!');
}; 
