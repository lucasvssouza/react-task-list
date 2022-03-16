import { useTaskList } from "../AppContext/AppProvider";
import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState, useRef } from "react";
import liststyle from "./liststyle.css";

export const ListTask = () => {
  const { getTaskList, setTaskList } = useTaskList();

  /// Mapeia e renderiza a Lista de Tarefas
  return (
    <div>
      {getTaskList.map((task) => {
        /// Exclui a tarefa
        function DelTask() {
          const [modalDel, setModalDel] = useState(false);
          const closeModalDel = () => setModalDel(false);
          const openModalDel = () => setModalDel(true);

          function checkDel() {
            /// Filtra as tarefas que não possuem a ID de pesquisa
            var id = task.id;
            const fill = getTaskList.filter((task) => {
              return task.id !== id;
            });
            setTaskList(fill);
            /// Filtra as tarefas que não possuem a ID de pesquisa
            /// Exibe alerta de sucesso
            toast.success(
              "Tarefa '" + task.name + "' foi excluida com sucesso!",
              {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "colored",
                progress: undefined,
              }
            );
            openModalDel(false);
          }
          /// Exibe alerta de sucesso

          return (
            /// Exibe o Modal de excluir tarefa
            <div>
              <button className="deletebutton" onClick={openModalDel}>
                ❌
              </button>
              <Modal show={modalDel} onHide={closeModalDel} contentClassName>
                <div className="modalH2">
                  <h2>Excluir Tarefa</h2>
                </div>
                <hr style={{ marginTop: "-10px" }}></hr>
                <div className="midDiv">
                  <label style={{ paddingLeft: "10px" }}>
                    Deseja mesmo excluir a tarafa: '{task.name}' ?
                  </label>
                </div>
                <hr></hr>
                <div className="buttonsDiv">
                  <Button
                    variant="secondary"
                    className="modalButtons"
                    onClick={closeModalDel}
                  >
                    Cancelar
                  </Button>
                  <Button
                    variant="primary"
                    className="modalButtons"
                    onClick={checkDel}
                  >
                    Excluir
                  </Button>
                </div>
              </Modal>
            </div>
            /// Exibe o Modal de excluir tarefa
          );
        }
        /// Exclui a tarefa

        /// Atualiza o "status" da tarefa
        function checkBox() {
          /// Define o "status" da tarefa para incompleto (false)
          if (task.done) {
            task.done = false;
            const boxUpdate = getTaskList.filter(() => {
              return getTaskList;
            });
            setTaskList(boxUpdate);
          }
          /// Define o "status" da tarefa para incompleto (false)
          /// Define o "status" da tarefa para completo (true)
          else {
            task.done = true;
            const boxUpdate = getTaskList.filter(() => {
              return getTaskList;
            });
            setTaskList(boxUpdate);
          }
          /// Define o "status" da tarefa para completo (true)
        }
        /// Atualiza o "status" da tarefa

        /// Atualiza o "nome" da tarefa
        function UpdateTask() {
          const [modalEdit, setmodalEdit] = useState(false);
          const closeModalEdit = () => setmodalEdit(false);
          const openModalEdit = () => setmodalEdit(true);
          const updateText = useRef();

          function checkUpdate(e) {
            e.preventDefault();
            /// Remove os "espaço" iniciais do input
            var edittext = updateText.current.value;
            while (edittext.charAt(0) === " ") {
              edittext = edittext.substring(1);
              console.log(edittext);
            }
            /// Remove os "espaço" iniciais do input
            var checkText = edittext.toString().indexOf(" ");

            if (checkText !== 0 && edittext !== "" && edittext !== null) {
              task.name = edittext;
              /// Atualiza o "nome" da tarefa e a atualiza o array
              const boxUpdate = getTaskList.filter(() => {
                return getTaskList;
              });
              /// Atualiza o "nome" da tarefa e a atualiza o array
              /// Salva o novo "nome da tarefa"
              setTaskList(boxUpdate);
              /// Salva o novo "nome da tarefa"
              openModalEdit(false);
              /// Exibe alerta de sucesso
              toast.success("Tarefa atualizada com sucesso!", {
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
              /// Limpa o input
              updateText.current.value = "";
              /// Limpa o input
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
              updateText.current.value = "";
              /// Limpa o input
            }
          }
          /// Exibe o Modal de atualizar tarefa
          return (
            <div>
              <button className="editbutton" onClick={openModalEdit}>
                ✏️
              </button>
              <Modal show={modalEdit} onHide={closeModalEdit} contentClassName>
                <div className="modalH2">
                  <h2>Editar Tarefa</h2>
                </div>
                <hr style={{ marginTop: "-10px" }}></hr>
                <form onSubmit={checkUpdate} className="midDiv">
                  <input
                    placeholder={task.name}
                    ref={updateText}
                    className="editInput"
                    maxLength={45}
                  ></input>
                </form>
                <hr></hr>
                <div className="buttonsDiv">
                  <Button
                    variant="secondary"
                    className="modalButtons"
                    onClick={closeModalEdit}
                  >
                    Cancelar
                  </Button>
                  <Button
                    variant="primary"
                    className="modalButtons"
                    onClick={checkUpdate}
                  >
                    Salvar
                  </Button>
                </div>
              </Modal>
            </div>
          );
          /// Exibe o Modal de atualizar tarefa
        }
        /// Atualiza o "nome" da tarefa

        /// Exibe a Lista de Tarefas
        return (
          <div className="tasklist" key={task.id}>
            <input
              className="checkbox"
              type="checkbox"
              checked={task.done}
              onChange={checkBox}
            ></input>
            <label className="tasktext">{task.name}</label>
            <UpdateTask></UpdateTask>
            <DelTask></DelTask>
          </div>
        );
        /// Exibe a Lista de Tarefas
      })}
    </div>
  );
  /// Mapeia e renderiza a Lista de Tarefas
};
