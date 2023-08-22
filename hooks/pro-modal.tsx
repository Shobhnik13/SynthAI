import { create } from 'zustand'
interface proModalStore {
    isOpen:boolean;
    onOpen:()=>void
    onClose:()=>void
  }

  export const useProModal = create<proModalStore>((set)=>({
        isOpen:false,
        onOpen:()=>set({isOpen:true}),
        onClose:()=>set({isOpen:false})
    }
  ))
