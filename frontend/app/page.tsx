/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import axios from "axios";
import { useEffect } from "react";

export default function page() {

  useEffect(() => {
    async function dos() {
      const res =await axios.get("/api/posts");
      console.log(res);
    }

    dos();
  }, [])
  
  return (
    <div>
      hey hey
    </div>
  )
}
