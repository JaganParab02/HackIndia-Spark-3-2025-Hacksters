$(document).ready(function () {
    table = $("#shiftListTable").DataTable({
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
       setInterval(function () {
           table.ajax.reload(null, false);
       }, 5000);
  });

  
function saveShift(postURL) {
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
  
    var form = document.getElementById("addShiftForm");
    var formdata = new FormData(form);
    $("#saveShiftButton").attr("disabled", true);
  
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
          $("#addShiftModal").modal("hide");
          $("#saveShiftButton").attr("disabled", false);
          $("#addShiftForm").reset();
        } else {
          console.log("Error");
        }
      },
    });
  }
  
  function editShift(id, postURL) {
    $.ajax({
      type: "POST",
      url: postURL,
      data: { id: id },
      dataType: "JSON",
      success: function (response) {
        $("#editId").val(response.id);
        $("#editshift").val(response.shift_name);
        $("#editfromTime").val(response.from_time);
        $("#edittoTime").val(response.to_time);
        $("#editcode").val(response.code);
        $("#editShiftModal").modal("show");
      },
    });
  }
  
  function updateShift(postURL) {
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
  
    var form = document.getElementById("editShiftForm");
    var formdata = new FormData(form);
    $("#editShiftButton").attr("disabled", true);
  
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
          $("#editShiftModal").modal("hide");
          $("#editShiftButton").attr("disabled", false);
          $("#editShiftForm").reset();
        } else {
          console.log("Error");
        }
      },
    });
  }
  
  function deleteShift(id, postURL) {
    $.confirm({
      title: "Confirm!",
      content: "<span>Are you sure you want to Delete The Shift ? </span>",
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
  
  
  
  