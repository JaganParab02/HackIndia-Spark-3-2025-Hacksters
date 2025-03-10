$(document).ready(function () {
    table = $("#ertUserTypeListTable").DataTable({
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

  
function saveErtUserType(postURL) {
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
  
    var form = document.getElementById("addErtUserTypeForm");
    var formdata = new FormData(form);
    $("#saveErtUserTypeButton").attr("disabled", true);
  
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
          $("#addErtUserTypeModal").modal("hide");
          $("#saveErtUserTypeButton").attr("disabled", false);
          $("#addErtUserTypeForm").reset();
        } else {
          console.log("Error");
        }
      },
    });
  }
  
  function editErtUserType(id, postURL) {
    $.ajax({
      type: "POST",
      url: postURL,
      data: { id: id },
      dataType: "JSON",
      success: function (response) {
        $("#editId").val(response.id);
        $("#edituserType").val(response.ert_user_type);
        $("#editcode").val(response.code);
        $("#editErtUserTypeModal").modal("show");
      },
    });
  }
  
  function updateErtUserType(postURL) {
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
  
    var form = document.getElementById("editErtUserTypeForm");
    var formdata = new FormData(form);
    $("#editErtUserTypeButton").attr("disabled", true);
  
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
          $("#editErtUserTypeModal").modal("hide");
          $("#editErtUserTypeButton").attr("disabled", false);
          $("#editErtUserTypeForm").reset();
        } else {
          console.log("Error");
        }
      },
    });
  }
  
  function deleteErtUserType(id, postURL) {
    $.confirm({
      title: "Confirm!",
      content: "<span>Are you sure you want to Delete The ErtUserType ? </span>",
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
  
  
  
  