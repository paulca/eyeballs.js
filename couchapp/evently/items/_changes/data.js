function(data) {
  $.log(data)
  var p;
  return {
    items : data.rows.map(function(r) {
      p = r.value.profile;
      p.message = r.value.message;
      return p;
    })
  }
};