import { ChangeEvent, useState } from "react";

// react hook form

export const useForm = <T extends Object>(initialState:T) => {
  const [formState, setFormState] = useState(initialState);

  const onInputChange = ({ target }:ChangeEvent<HTMLInputElement>) => {
    const { name, value } = target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const onResetForm = () => setFormState(initialState);

  const toggleCheck=(name:string,value:boolean)=>{
    setFormState({
      ...formState,
      [name]: !value,
    });
  }

  return {
    ...formState,
    formState,
    onInputChange,
    onResetForm,
    toggleCheck
  };
};
