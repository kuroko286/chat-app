const messageReducer = (dialog, action) => {
  switch (action.type) {
    case "SEND_MESSAGE": {
      const { message, fromUser } = action.payload;

      return [
        ...dialog,
        {
          message,
          fromId: fromUser._id,
          fromUsername: fromUser.username,
        },
      ];
    }
    case "LOAD_MESSAGE_SUCCESS": {
      return action.payload.map((mess) => {
        return {
          message: mess.text,
          fromId: mess.from,
          fromUsername: mess.fromUsername,
        };
      });
    }
    case "LOAD_MESSAGE_ERROR": {
      return [];
    }

    default:
      break;
  }
};

export default messageReducer;
