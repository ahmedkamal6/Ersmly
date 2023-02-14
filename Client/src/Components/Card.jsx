import React from "react";
import { download } from "../assets";
import { downloadImage } from "../utils/index";
import { deleteIcon } from "../assets";
import { useDispatch, useSelector } from "react-redux";
import { deletePost, getAllPosts } from "../Redux/postsSlice";
const Card = (props) => {
  const dispatch = useDispatch()
  const { userid } = useSelector((state) => state.login);
  return (
    <div className="rounded-xl group relative shadow-card hover:shadow-cardhover card">
      <img
        className="w-full h-auto object-cover rounded-xl"
        src={props.photo}
        alt={props.prompt}
      />
      <div className="group-hover:flex flex-col max-h-[94.5%] hidden absolute bottom-0 left-0 right-0 bg-[#10131f] m-2 p-4 rounded-md">
        <p className="text-white text-sm overflow-y-auto prompt">
          {props.prompt}
        </p>
        <div className="mt-5 flex justify-between items-center gap-2">
          <div className="flex items-center gap-2">
            <p className="text-white text-sm">{props.name}</p>
          </div>
          <div className="flex gap-5">
            <button
              type="button"
              onClick={() => downloadImage(props._id, props.photo)}
              className="outline-none bg-transparent border-none"
            >
              <img
                src={download}
                alt="download"
                className="w-6 h-6 object-contain invert"
              />
            </button>
            {props.userid ===
              userid && (
                <button
                  type="button"
                  onClick={() => dispatch(deletePost(props._id)).then(()=>dispatch(getAllPosts()))}
                  className="outline-none bg-transparent border-none"
                >
                  <img
                    src={deleteIcon}
                    alt="download"
                    className="w-6 h-6 object-contain invert"
                  />
                </button>
              )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
