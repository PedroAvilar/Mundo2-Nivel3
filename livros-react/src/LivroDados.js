import React, { useState } from "react";
import ControleLivro from "./controle/ControleLivros";
import ControleEditora from "./controle/ControleEditora";
import { useNavigate } from "react-router-dom";

//Instâncias das classes.
const controleLivro = new ControleLivro();
const controleEditora = new ControleEditora();

function LivroDados () {
    const opcoes = controleEditora.getEditoras().map(editora => ({
        value: editora.codEditora,
        text: editora.nome
    }));
    const [titulo, setTitulo] = useState ('');
    const [resumo, setResumo] = useState ('');
    const [autores, setAutores] = useState ('');
    const [codEditora, setCodEditora] = useState(opcoes[0].value);
    const navigate = useNavigate();
    const tratarCombo = (evento) => {
        setCodEditora(Number(evento.target.value));
    };
    const incluir = (evento) => {
        evento.preventDefault();
        const autoresArray = autores.split('\n');
        const novoLivro = {
            codigo: 0,
            titulo: titulo,
            resumo: resumo,
            autores: autoresArray,
            codEditora: codEditora
        };
        controleLivro.incluir(novoLivro);
        navigate('/');
    }
    return (
        <main className="container-fluid">
            <div className="row">
                <h1>Dados do livro</h1>
                <form onSubmit={incluir}>
                    <div className="mb-3">
                        <label htmlFor="titulo" className="form-label">Título</label>
                        <input type="text" className="form-control" value={titulo} onChange={(e) => setTitulo(e.target.value)}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="resumo" className="form-label">Resumo</label>
                        <textarea type="text" className="form-control" value={resumo} onChange={(e) => setResumo(e.target.value)}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="editora" className="form-label">Editora</label>
                        <select className="form-select" value={codEditora} onChange={tratarCombo}>
                            {opcoes.map(opcao => (
                                <option key={opcao.value} value={opcao.value}>{opcao.text}</option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="autores" className="form-label">Autores (1por linha)</label>
                        <textarea type="text" className="form-control" value={autores} onChange={(e) => setAutores(e.target.value)}/>
                    </div>
                    <div className="mb-3">
                        <button type="submit" className="btn btn-primary" >Salvar dados</button>
                    </div>
                </form>
            </div>
        </main>
    );
}
export default LivroDados;