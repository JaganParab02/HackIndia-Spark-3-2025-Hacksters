$(document).ready(function () {
  table = $("#userListTable").DataTable({
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

function saveUser(postURL) {
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

  var form = document.getElementById("addUserForm");
  var formdata = new FormData(form);
  $("#saveUserButton").attr("disabled", true);

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
        $("#addUserModal").modal("hide");
        $("#saveUserButton").attr("disabled", false);
        $("#addUserForm").reset();
      } else {
        console.log("Error");
      }
    },
  });
}

function editUser(id, postURL) {
  $.ajax({
    type: "POST",
    url: postURL,
    data: { id: id },
    dataType: "JSON",
    success: function (response) {
      $("#userId").val(response.id);
      $("#editfullName").val(response.fullName);
      $("#editemail").val(response.email);
      $("#editusername").val(response.username);
      $("#edituserType").val(response.user_type);
      $("#editmobileNo").val(response.mobile);
      // $("#editdepartment").val(response.department);
      $("#editUserModal").modal("show");
    },
  });
}

function updateUser(postURL) {
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

  var form = document.getElementById("editUserForm");
  var formdata = new FormData(form);
  $("#editUserButton").attr("disabled", true);

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
        $("#editUserModal").modal("hide");
        $("#editUserButton").attr("disabled", false);
        $("#editUserForm").reset();
      } else {
        console.log("Error");
      }
    },
  });
}

function deleteUser(id, postURL) {
  $.confirm({
    title: "Confirm!",
    content: "<span>Are you sure you want to Delete The User ? </span>",
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
                location.reload();
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

function viewUser(id, postURL) {
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
      $("#viewUserModal").modal("show");
    },
  });
}
