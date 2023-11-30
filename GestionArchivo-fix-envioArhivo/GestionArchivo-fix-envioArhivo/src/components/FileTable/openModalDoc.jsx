import React, { Suspense, lazy } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from '../../store/store';

const openModalDoc = (type) => {
  const Modal = lazy(() => import("./FileTable"));
  const modalDiv = document.createElement("div");
  modalDiv.id = "modal";
  document.body.appendChild(modalDiv);

  const root = createRoot(modalDiv); 
  root.render(
    <Provider store={ store }>
      <Suspense fallback={<div>Loading</div>}>
        <Modal root={root} title="Nueva Carga" type={ type } />
      </Suspense>
    </Provider>
  );
}

export default openModalDoc;