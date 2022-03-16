import { useEffect, useRef } from "react";
import { useTaskList } from "../AppContext/AppProvider";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import addstyle from "./addstyle.css";

export const AddTask = () => {
  const { getTaskList, setTaskList } = useTaskList();
  const target = useRef("");

  /// Função de envio de formulario
  const createTask = (e) => {
    e.preventDefault();
    /// Remove os "espaço" iniciais do input
    var name = target.current.value;
    while (name.charAt(0) === " ") {
      name = name.substring(1);
      console.log(name);
    }
    /// Remove os "espaço" iniciais do input
    var checkText = name.toString().indexOf(" ");
    if (checkText !== 0 && name !== null && name !== "") {
      /// Salva a nova tarefa em um array
      let newtask = {
        id: new Date().getTime().toString(),
        name: name,
        done: false,
      };
      /// Salva a nova tarefa em um array
      /// Salva o objeto "tarefa" no array
      setTaskList([...getTaskList, newtask]);
      /// Salva  o objeto "tarefa" no array
      /// Limpa o input
      target.current.value = "";
      /// Limpa o input
      /// Exibe alerta de sucesso
      toast.success("Tarefa criada com sucesso!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
        progress: undefined,
      });
      /// Exibe alerta de sucesso
    } else {
      /// Exibe alerta de erro
      toast.error("Não é possivel criar uma tarefa vazia!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
        progress: undefined,
      });
      /// Exibe alerta de erro
      /// Limpa o input
      target.current.value = "";
      /// Limpa o input
    }
  };
  /// Função de envio de formulario

  /// Salva a tarefa no localstorage
  useEffect(() => {
    localStorage.setItem("task", JSON.stringify(getTaskList));
  }, [getTaskList]);
  /// Salva a tarefa no localstorage

  /// Formulario de cadastro
  return (
    <form autoComplete="off" onSubmit={createTask} className="addtask">
      <input
        type="text"
        placeholder="Adicionar Tarefa"
        required
        ref={target}
        className="addtext"
        maxLength={45}
      />
      <button type="submit" className="addbutton" onClick={createTask}>
        ➕
      </button>
    </form>
  );
  /// Formulario de cadastro
};
