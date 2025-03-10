$(document).ready(function () {
  table = $("#gateListTable").DataTable({
    processing: false, //Feature control the processing indicator.
    serverSide: true, //Feature control DataTables' server-side processing mode.
    regex: true,
    order: [], //Initial no order.
    ajax: {
      type: "POST",
      url: $("#dataTableURL").val(),
    } /*
                                              "scrollY": "400px",
                                              "scrollX": true,
                                                               */,
  });
  //    setInterval(function () {
  //        table.ajax.reload(null, false);
  //    }, 5000);
});

function saveGate(postURL) {
  valid = 0;
  $(".req").each(function () {
    value = $(this).val();
    if (!value || value == "" || value == null) {
      $(this).addClass("border border-danger");
      toastr.error("This Field is Required");
      valid = 0;
      return false;
    } else {
      $(this).removeClass("border border-danger");
      valid = 1;
    }
  });
  if (valid == 0) {
    return false;
  }

  var form = document.getElementById("addGateForm");
  var formdata = new FormData(form);
  $("#saveGateButton").attr("disabled", true);

  $.ajax({
    type: "POST",
    url: postURL,
    data: formdata,
    dataType: "JSON",
    contentType: false,
    processData: false,
    success: function (response) {
      if (response.flag == 1) {
        console.log("success");
        $("#addGateModal").modal("hide");
        $("#saveGateButton").attr("disabled", false);
        $("#addGateForm").reset();
      } else {
        console.log("Error");
      }
    },
  });
}

function editGate(id, postURL) {
  $.ajax({
    type: "POST",
    url: postURL,
    data: { id: id },
    dataType: "JSON",
    success: function (response) {
      $("#editId").val(response.id);
      $("#editgate").val(response.gate);
      $("#editGateModal").modal("show");
    },
  });
}

function updateGate(postURL) {
  $(".editreq").each(function () {
    value = $(this).val();
    if (!value || value == "" || value == null) {
      $(this).addClass("border border-danger");
      toastr.error("This Field is Required");
      valid = 0;
      return false;
    } else {
      $(this).removeClass("border border-danger");
      valid = 1;
    }
  });
  if (valid == 0) {
    return false;
  }

  var form = document.getElementById("editGateForm");
  var formdata = new FormData(form);
  $("#editGateButton").attr("disabled", true);

  $.ajax({
    type: "POST",
    url: postURL,
    data: formdata,
    dataType: "JSON",
    contentType: false,
    processData: false,
    success: function (response) {
      if (response.flag == 1) {
        console.log("success");
        $("#editGateModal").modal("hide");
        $("#editGateButton").attr("disabled", false);
        $("#editGateForm").reset();
      } else {
        console.log("Error");
      }
    },
  });
}

function deleteGate(id, postURL) {
  $.confirm({
    title: "Confirm!",
    content: "<span>Are you sure you want to Delete The Gate ? </span>",
    buttons: {
      Yes: {
        btnClass: "btn-success",
        action: function () {
          $.ajax({
            type: "POST",
            url: postURL,
            data: { id: id },
            dataType: "JSON",
            success: function (response) {
              if (response.flag == 1) {
              } else {
                $("#displayDiv").empty();
                $("#displayDiv").prepend(
                  "<div class='alert alert-danger alert-dismissable fade show' id='alertDiv'><button type='button' class='close' data-dismiss='alert' aria-hidden='true'>×</button><p style='margin-bottom: 0rem !important;'><strong>" +
                    response.message +
                    " </strong></p></div>"
                );
                $("#displayDiv").show();
              }
            },
          });
        },
      },
      No: {
        btnClass: "btn-danger",
        action: function () {
          $("#displayDiv").empty();
          $("#displayDiv").prepend(
            "<div class='alert alert-warning alert-dismissable fade show' id='alertDiv'><button type='button' class='close' data-dismiss='alert' aria-hidden='true'></button><p style='margin-bottom: 0rem !important;'><strong>Approve Canceled !! </strong></p></div>"
          );
          $("#displayDiv").show();
        },
      },
    },
  });
}
