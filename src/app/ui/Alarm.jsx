import { useEffect, useRef, useState } from "react";

export default function Alarm({ alarmData }) {
  const [isResolved, setResolved] = useState(false);
  const closeRef = useRef();
  const modalRef = useRef();

  const resolveClick = (e) => {
    setResolved(true);
    alarmData.resolve(e.target.getAttribute("data-status"));
    // Закрытие через событие Bootstrap лучше, таймаут небольшой
    setTimeout(() => {
      if (closeRef.current) closeRef.current.click();
      setResolved(false);
    }, 50);
  };

  const rejectClick = () => {
    if (!isResolved) {
      alarmData.reject();
    }
  };

  useEffect(() => {
    if (!modalRef.current) return;
    modalRef.current.addEventListener("hide.bs.modal", rejectClick);
    return () => {
      if (modalRef.current) {
        modalRef.current.removeEventListener("hide.bs.modal", rejectClick);
      }
    };
  }, [alarmData]);

  const btnClasses = ["btn-primary", "btn-secondary", "btn-success", "btn-info"];
  const statusStyles = {
    ok: "btn-success",
    cancel: "btn-danger",
    warning: "btn-warning",
    info: "btn-info",
  };
  const iconMap = {
    info: <i className="bi bi-info-circle text-info me-2"></i>,
    warning: <i className="bi bi-exclamation-triangle text-warning me-2"></i>,
    stop: <i className="bi bi-sign-stop text-danger me-2"></i>,
  };

  return (
    <div
      ref={modalRef}
      className="modal fade"
      id="alarmModal"
      tabIndex="-1"
      aria-labelledby="alarmModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5 d-flex align-items-center" id="alarmModalLabel">
              {iconMap[alarmData.icon] || null}
              {alarmData.title}
            </h1>
            <button
              onClick={rejectClick}
              ref={closeRef}
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">{alarmData.message}</div>
          <div className="modal-footer">
            {Array.isArray(alarmData.buttons) &&
              alarmData.buttons.map((btn, index) => {
                const styleByStatus = statusStyles[btn.status];
                const cyclicClass = btnClasses[index % btnClasses.length];
                const finalClass = styleByStatus || cyclicClass || "btn-primary";
                return (
                  <button
                    key={btn.status + index}
                    data-status={btn.status}
                    onClick={resolveClick}
                    type="button"
                    className={"btn " + finalClass}
                  >
                    {btn.title}
                  </button>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}
