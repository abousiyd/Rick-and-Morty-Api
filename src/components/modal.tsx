import Portal from "../portal/index";

interface IModal {
  active: boolean;
  children: JSX.Element;
}
const Modal = ({ children, active }: IModal) => (
  <Portal>
    {active && (
      <div className="modal">
        <div className="modal__window">
          <div>{children}</div>
        </div>
      </div>
    )}
  </Portal>
);

export default Modal;
