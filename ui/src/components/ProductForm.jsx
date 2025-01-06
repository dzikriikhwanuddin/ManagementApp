import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const ProductForm = ({ isEdit }) => {
  const [product, setProduct] = useState({ name: "", description: "", price: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (isEdit) {
      fetchProduct();
    }
  }, [isEdit]);

  const fetchProduct = async () => {
    try {
      const response = await axios.get(`http://localhost:5124/api/products/${id}`);
      setProduct(response.data);
    } catch (error) {
      console.error("Error fetching product:", error);
      setError("Gagal memuat data produk.");
    }
  };

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = isEdit
        ? `http://localhost:5124/api/products/${id}`
        : "http://localhost:5124/api/products";

      const method = isEdit ? "put" : "post";

      await axios({
        method: method,
        url: url,
        data: product,
        headers: {
          "Content-Type": "application/json",
        },
      });

      navigate("/");
    } catch (error) {
      console.error("Error saving product:", error);
      setError("Gagal menyimpan produk.");
    }
  };

  return (
    <div className="container mt-5">
      <h2>{isEdit ? "Edit Produk" : "Tambah Produk"}</h2>

      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nama</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={product.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Deskripsi</label>
          <input
            type="text"
            className="form-control"
            name="description"
            value={product.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Harga</label>
          <input
            type="number"
            className="form-control"
            name="price"
            value={product.price}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-success">
          Simpan
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
