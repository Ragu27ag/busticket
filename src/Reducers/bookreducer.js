const initialState = {
  no: "",
};

function bookreducer(state = initialState, action) {
  console.log(action);
  switch (action.type) {
    case "BOOK":
      return {
        ...state,
        no: action.no,
      };
    default:
      return state;
  }
}

export default bookreducer;
