import { useState } from "react";

const useChangeOptions = (initialOption) => {
  const [option, setOption] = useState(initialOption);
  return [option, setOption];
};

export default useChangeOptions;
