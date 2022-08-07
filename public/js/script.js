
function setValueDelete(value){
  $("#valueIdd").val(value).change();
}

function setValueEdit(value1, value2){
  $("#valueId").val(value1).change();
  $("#valueText").attr("placeholder", value2);
} 