import { filterChange } from "../reducers/filterReducer";
import { useDispatch } from "react-redux";

const TextFilter = (props) => {
    
    const dispatch = useDispatch()

    const handleChange = (event) => {
        dispatch(filterChange(event.target.value))
    }

    const style = {
        marginBottom: 10
      }

    return (
        <div style={style}>
            <h2>Filter</h2>
            Filter: <input type="text" name="filter" onChange={handleChange} />
        </div>
    );
}

export default TextFilter