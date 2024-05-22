import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import apiRetaguarda from "../config/apiRetaguarda";

const Login = () => {
  const [msg, setMsg] = useState();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const email = event.target.email.value;
    const senha = event.target.senha.value;

    try {
      const response = await apiRetaguarda.post("/login", { email, senha });
      const token = response.data.token;

      // Armazene o token no localStorage
      localStorage.setItem("token", token);

      navigate("/auth/home");
    } catch (error) {
      setMsg(error.message);
      console.error("Falha na autenticação", error);
      // Aqui você pode adicionar qualquer tratamento de erro que desejar
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card mt-5 shadow-lg">
            <div className="card-body">
              <h2 className="text-center mb-4">
                Retaguarda <br className="d-sm-none" /> Chiller-Omie
              </h2>
              <h3 className="text-center mb-4">Autenticação</h3>
              {msg && (
                <div className="alert alert-danger" role="alert">
                  {JSON.stringify(msg)}
                </div>
              )}
              <form onSubmit={handleSubmit}>
                <div className="form-group mb-4">
                  <label htmlFor="email">E-mail</label>
                  <input type="email" id="email" name="email" className="form-control" />
                </div>
                <div className="form-group mb-4">
                  <label htmlFor="senha">Senha</label>
                  <input type="password" id="senha" name="senha" className="form-control" />
                </div>
                <button type="submit" className="btn btn-primary btn-block">
                  Entrar
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
