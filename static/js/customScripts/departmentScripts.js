$(document).ready(function () {
    table = $("#departmentListTable").DataTable({
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

  
function saveDepartment(postURL) {
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
  
    var form = document.getElementById("addDepartmentForm");
    var formdata = new FormData(form);
    $("#saveDepartmentButton").attr("disabled", true);
  
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
          $("#addDepartmentModal").modal("hide");
          $("#saveDepartmentButton").attr("disabled", false);
          $("#addDepartmentForm").reset();
        } else {
          console.log("Error");
        }
      },
    });
  }
  
  function editDepartment(id, postURL) {
    $.ajax({
      type: "POST",
      url: postURL,
      data: { id: id },
      dataType: "JSON",
      success: function (response) {
        $("#editId").val(response.id);
        $("#editdepartment").val(response.department);
        $("#editcode").val(response.code);
        $("#editDepartmentModal").modal("show");
      },
    });
  }
  
  function updateDepartment(postURL) {
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
  
    var form = document.getElementById("editDepartmentForm");
    var formdata = new FormData(form);
    $("#editDepartmentButton").attr("disabled", true);
  
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
          $("#editDepartmentModal").modal("hide");
          $("#editDepartmentButton").attr("disabled", false);
          $("#editDepartmentForm").reset();
        } else {
          console.log("Error");
        }
      },
    });
  }
  
  function deleteDepartment(id, postURL) {
    $.confirm({
      title: "Confirm!",
      content: "<span>Are you sure you want to Delete The Department ? </span>",
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
  
  function viewDepartment(id, postURL) {
    $.ajax({
      type: "POST",
      url: postURL,
      data: { id: id },
      dataType: "JSON",
      success: function (response) {
        $("#viewfullName").text(response.fullName);
        $("#viewemail").text(response.email);
        $("#viewusername").text(response.username);
        $("#viewuserType").text(response.user_type);
        $("#viewmobileNo").text(response.mobile);
        // $("#viewdepartment").text(response.department);
        $("#viewDepartmentModal").modal("show");
      },
    });
  }
  
  