// QUẢN LÝ SẢN PHẨM
let productList = [];

function renderProduct(data) {
  if (!data) data = productList;
  var tableHTML = "";

  for (let index in data) {
    let currentProduct = data[index];

    let salePrice = (1- (currentProduct.sale / 100)) * currentProduct.price

    // dùng `` để viết chuỗi ở nhiều dòng
    // để viết chuỗi + biến: "chuỗi 1" + biến +"chuỗi 2" hoặc "chuỗi 1 ${biến} chuỗi 2"
    tableHTML += `<tr class="align-middle">
    <td>SP000${currentProduct.id}</td> 
    <td><img class="img-fluid" src="${currentProduct.img}" alt=""></td>                      
    <td>
      <div class="fw-bold">${currentProduct.name}</div>
    </td>                           
    <td class="fw-bold">${currentProduct.type}</td>
    <td>
      <div class="salePrice">${formatCash(salePrice)}</div>
      <div class="price">${formatCash(currentProduct.price)}</div>
    </td>
    <td class="fw-bold">-${currentProduct.sale} %</td>                       
    <td>
      <ul class="list-unstyled text-start">
        <li>Màn hình: ${currentProduct.screen}</li>        
        <li>RAM, ROM: ${currentProduct.memory}</li>
        <li>Pin, Sạc: ${currentProduct.battery}</li>
      </ul>
    </td>                      
    <td>
      <div>
        <button class="btn btn-success" onclick="getUpdateProduct(${currentProduct.id})" data-bs-toggle="modal" data-bs-target="#createProductModal">
          <i class="fa-solid fa-pen-to-square pe-2"></i>SỬA
        </button> 
        <button class="btn btn-danger" onclick="deleteProduct(${currentProduct.id})">
          <i class="fa-solid fa-trash-can pe-2"></i>XÓA
        </button>
      </div>                                                                       
    </td>
  </tr>`;
  }
  document.getElementById("tbodyProduct").innerHTML = tableHTML;
}

const getProductList = async() => {
  try {
    const res = await axios({
      url: "https://6355725b483f5d2df3b4a6ce.mockapi.io/api/phones",
      method: "GET",
    });
    productList = res.data;
    renderProduct();
    console.log("done", productList);
  } catch (error) {
    console.log(error);
  }
};

window.onload = () => {
  console.log("window load");
  getProductList();
};

// tạo sản phẩm
const createProduct = () => {
  var isFormValid = validateForm();

  if (!isFormValid) return;

  // 1.lấy input
  let id = "";
  let type = document.getElementById("txtType").value;
  let name = document.getElementById("txtName").value;
  let img = document.getElementById("txtImg").value;
  let price = +document.getElementById("txtPrice").value;
  let sale = document.getElementById("txtSale").value;
  let screen = document.getElementById("txtScreen").value;
  let battery = document.getElementById("txtBattery").value;
  let backCamera = document.getElementById("txtBackCamera").value;
  let frontCamera = document.getElementById("txtFrontCamera").value;
  let memory = document.getElementById("txtMemory").value;

  // 3. tạo object sinh viên mới (input)
  var newProduct = new Product(
    id,
    type,
    name,
    price,
    screen,
    backCamera,
    frontCamera,
    battery,
    img,
    memory,
    sale
  );

  try {
    const res = axios({
      url: "https://6355725b483f5d2df3b4a6ce.mockapi.io/api/phones",
      method: "POST",
      data: newProduct,
    });
    console.log(res);
    deleteForm();
  } catch (err) {
    console.log("err");
  }
  // .then(function (res) {
  //   console.log(res);
  // })
  // .catch(function (error) {
  //   console.log(error);
  // });
};

// sửa sản phẩm
// đưa sp lên form
const getUpdateProduct = async (id) => {
  document.getElementById("id").style.display="block";
  
  try {
    const res = await axios({
      url: "https://6355725b483f5d2df3b4a6ce.mockapi.io/api/phones/" + id,
      method: "GET",
    });
    let product = res.data;

    document.getElementById("txtId").value = product.id;
    document.getElementById("txtType").value = product.type;
    document.getElementById("txtName").value = product.name;
    document.getElementById("txtImg").value = product.img;
    document.getElementById("txtPrice").value = product.price;
    document.getElementById("txtSale").value = product.sale;
    document.getElementById("txtScreen").value = product.screen;
    document.getElementById("txtBattery").value = product.battery;
    document.getElementById("txtBackCamera").value = product.backCamera;
    document.getElementById("txtFrontCamera").value = product.frontCamera;
    document.getElementById("txtMemory").value = product.memory;

    // hiện nút lưu thay đổi, ẩn nút thêm
    document.getElementById("btnUpdate").style.display = "inline-block";
    document.getElementById("btnCreate").style.display = "none";
  } catch (err) {
    console.log("err");
  }
};

// sửa => lưu lại
const updateProduct = async () => {
  let id = document.getElementById("txtId").value;
  let type = document.getElementById("txtType").value;
  let name = document.getElementById("txtName").value;
  let img = document.getElementById("txtImg").value;
  let price = +document.getElementById("txtPrice").value;
  let sale = document.getElementById("txtSale").value;
  let screen = document.getElementById("txtScreen").value;
  let battery = document.getElementById("txtBattery").value;
  let backCamera = document.getElementById("txtBackCamera").value;
  let frontCamera = document.getElementById("txtFrontCamera").value;
  let memory = document.getElementById("txtMemory").value;

  // tạo đối tượng mới
  var newProduct = new Product(
    id,
    type,
    name,
    price,
    screen,
    backCamera,
    frontCamera,
    battery,
    img,
    memory,
    sale
  );

  try {
    const res = await axios({
      url: "https://6355725b483f5d2df3b4a6ce.mockapi.io/api/phones/" + id,
      method: "PUT",
      data: newProduct,
    });
    console.log(res);
    document.getElementById("btnUpdate").style.display = "none";
    document.getElementById("btnCreate").style.display = "block";
    getProductTableList();
    // clear toàn bộ input
    document.getElementById("btnReset").click();
  } catch (err) {
    console.log("err");
  }
};

const deleteForm = () => {
  document.getElementById("btnReset").click();

  document.getElementById("spanName").innerHTML = "";
  document.getElementById("spanType").innerHTML = "";
  document.getElementById("spanPrice").innerHTML = "";
  document.getElementById("spanImg").innerHTML = "";
  document.getElementById("spanScreen").innerHTML = "";
  document.getElementById("spanBattery").innerHTML = "";
  document.getElementById("spanBackCamera").innerHTML = "";
  document.getElementById("spanFrontCamera").innerHTML = "";
  document.getElementById("spanMemory").innerHTML = "";

  document.getElementById("btnUpdate").style.display = "none";
    document.getElementById("btnCreate").style.display = "block";
};

const deleteProduct = async(id) => {

  let index = productList.findIndex((item) => item.id == id);

  if (index !== -1) {
    productList.splice(index, 1);
  };


  try {
    var res = await axios({
      url: "https://6355725b483f5d2df3b4a6ce.mockapi.io/api/phones/" + id,
      method: "DELETE",
    });
    console.log(res);
    getProductList();
  } catch (error) {
    console.log(error);
  };
}

function validateForm() {
  // kiểm tra form
  let name = document.getElementById("txtName").value;
  let type = document.getElementById("txtType").value;
  let price = document.getElementById("txtPrice").value;
  let img = document.getElementById("txtImg").value;
  let screen = document.getElementById("txtScreen").value;
  let battery = document.getElementById("txtBattery").value;
  let backCamera = document.getElementById("txtBackCamera").value;
  let frontCamera = document.getElementById("txtFrontCamera").value;
  let memory = document.getElementById("txtMemory").value;

  // để xét từng lệnh có thể lông trong if nhưng nhiều code
  // vd: if (required(studentId, "spanMaSV")){
  //   length(studentId, "spanMaSV", 6, 9)};
  // có thể dùng toán tử logic && để xét từng vế
  var isValid = true;
  // &&= trả về giá trị true howcj false
  // isValid &&= true => isValid = isValid && true

  isValid &= required(name, "spanName") && length(name, "spanName", 1, 50);
  isValid &= required(type, "spanType");
  isValid &= required(price, "spanPrice") && number(price, "spanPrice");
  isValid &= required(img, "spanImg");
  isValid &= required(screen, "spanScreen");
  isValid &= required(battery, "spanBattery");
  isValid &= required(backCamera, "spanBackCamera");
  isValid &= required(frontCamera, "spanFrontCamera");
  isValid &= required(memory, "spanMemory");

  return isValid;
  // nếu isValid true => form ok
  // nếu isValid false => form error
}

const required = (val, span) => {
  // lấy thuộc tính ID của thẻ span
  if (val.length === 0) {
    document.getElementById(span).innerHTML = "*Trường này bắt buộc nhập";
    return false;
  }

  document.getElementById(span).innerHTML = "";
  return true;
};

const length = (val, spanId, min, max) => {
  if (val.length < min || val.length > max) {
    document.getElementById(spanId).innerHTML = `*Độ dài phải từ ${min} tới ${max} kí tự`;
    return false;
  };

  document.getElementById(spanId).innerHTML = "";
  return true;
};

const number = (val, spanId) => {
  var pattern = /[0-9]/;
  if (pattern.test(val)) {
    document.getElementById(spanId).innerHTML = "";
    return true;
  }

  document.getElementById(spanId).innerHTML = `*Chỉ chấp nhận kí tự số`;
  return false;
};

const formatCash = (price) => {
  const VND = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });

  return VND.format(price);
};