import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import LookbookModal from "../../components/modals/LookbookModal";
import { deleteLookbook } from "../../slice/lookbookSlice";
import { openModal } from "../../slice/modalSlice";
import "./lookbooks.scss";

function Lookbooks() {
  const dispatch = useDispatch();
  const { lookbooks } = useSelector((store) => store.lookbook);

  return (
    <div className="lookbooks">
      <div className="lookbooks-btn">
        <h2>OUR LOOKBOOKS</h2>
        <button onClick={() => dispatch(openModal("addLookbook"))}>add</button>
      </div>
      <LookbookModal />

      <table className="lookbooks-table">
        <thead>
          <tr className="thead-tr">
            <th>Name</th>
            <th>Description</th>
            <th>Note</th>
          </tr>
        </thead>
        <tbody>
          {lookbooks?.map((lookbook, i) => (
            <tr key={i} className="tbody-tr">
              <td className="tbody-tr-name">
                <Link
                  to={`/lookbooks/${lookbook._id}`}
                  state={lookbook}
                  className="navi"
                >
                  {lookbook.name}
                </Link>
              </td>
              <td>{lookbook.description}</td>
              <td>
                <button onClick={() => dispatch(deleteLookbook(lookbook._id))}>
                  del
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Lookbooks;
