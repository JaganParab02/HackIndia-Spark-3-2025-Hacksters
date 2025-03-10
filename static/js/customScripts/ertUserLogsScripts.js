$(document).ready(function () {
    ertUserLogsDataTable();
});
 function ertUserLogsDataTable() {
  $('#ertUserLogsTable').DataTable().destroy();
  shift = $("#shift").val();
  gate = $("#gate").val();
  ertUser = $("#employee").val();
  table = $("#ertUserLogsTable").DataTable({
    buttons: ['copy', 'csv', 'excel', 'pdf', 'print'],
    processing: false, //Feature control the processing indicator.
    serverSide: true, //Feature control DataTables' server-side processing mode.
    regex: true,

    order: [], //Initial no order.
    ajax: {
      type: "POST",
      url: $("#dataTableURL").val(),
      data: {
        shift: shift,
        gate: gate,
        ertUser: ertUser,
      },
    },
    
  });
}

$("#shift").on("change", function () {
  ertUserLogsDataTable();
});
$("#gate").on("change", function () {
  ertUserLogsDataTable();
});
$("#employee").on("change", function () {
  ertUserLogsDataTable();
});
