
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const Toaster = (props) => {

  const option = {
    position: 'bottom-right',
    autoClose: 4000,
    hideProgress: false,
    closeOnClick: true,
    pauseOnHover: true,
    graggable: true,
    progress: undefined,
  }

console.log("I am fired");
  const type = props.type === undefined ? 'default' : props.type;

  type === 'default' ? (
      toast(props.message, option)
    ) :
      (
        toast[type](props.message, option)
      )
}

export default Toaster