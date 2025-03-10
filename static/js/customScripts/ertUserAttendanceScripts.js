$(document).ready(function () {
  ertUserDataTable();
  // setInterval(function () {
  //   $("#barcode").focus();
  //   console.log('Focus');
  // }, 1);
});
var timeoutKit;
function ertUserDataTable() {
  $("#ertUserAttendanceList").DataTable().destroy();
  // shift = $("#shift").val();
  // gate = $("#gate").val();

  // if (shift == "") {
  //   return false;
  // } else if (gate == "") {
  //   return false;
  // }

  table = $("#ertUserAttendanceList").DataTable({
    processing: false, //Feature control the processing indicator.
    serverSide: true, //Feature control DataTables' server-side processing mode.
    regex: true,

    order: [], //Initial no order.
    ajax: {
      type: "POST",
      url: $("#dataTableURL").val(),
      data: {
        // shift: shift,
        // gate: gate,
      },
    },
  });
}

// $("#shift").on("change", function () {
//   ertUserDataTable();
// });
// $("#gate").on("change", function () {
//   ertUserDataTable();
// });

function displayBarcodeDiv() {
  shift = $("#shift").val();

  gate = $("#gate").val();

  if (shift == "" || gate == "") {
    alert("Please Select Shift and Gate");
    $("#barcodeScanningDiv").addClass("d-none");
  } else {
    $("#barcodeScanningDiv").removeClass("d-none");
    $("#barcode").focus();
  }
}

$("#barcode").on("input", function () {
  clearTimeout(timeoutKit);
  timeoutKit = setTimeout(
    function () {
      postUrl = $("#attendanceUrl").val();
      barcode = $("#barcode").val();
      // shift = $("#shift").val();
      // gate = $("#gate").val();
      console.log(barcode.length);
      if (barcode.trim() == "") {
        $("#barcode").val("");
        // alert("Barcode Cannot be Empty");
        return false;
      } else {
        $.ajax({
          type: "POST",
          url: postUrl,
          data: {
            barcode: barcode,
            // shift: shift,
            // gate: gate,
          },
          dataType: "JSON",
          success: function (response) {
            if (response.flag == 1) {
              $("#barcode").val("");
              $("#barcode").focus();
              // alert(response.message);
              ertUserDataTable();
            }
          },
        });
      }
    }.bind(this),
    100
  );
});

// $(document).ready(function () {
 
// });
