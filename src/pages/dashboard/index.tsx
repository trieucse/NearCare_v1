import LayoutPage from "../../components/LayoutPage";
import React, { ComponentType, FC, useState } from "react";
import Head from "next/head";
// import NcLink from "../../components/NcLink";
import Textarea from "../../components/Textarea";
import ButtonPrimary from "../../components/ButtonPrimary";
import Label from "../../components/Label";
import Input from "../../components/Input";
// import Select from "../../components/Select";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export interface PageDashboardProps {
  className?: string;
}
const PageDashboard: FC<PageDashboardProps> = ({ className = "" }) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [ntarget, setTarget] = useState(1)
  const [showNotification, setShowNotification] = useState(false)
  const handleSubmit = (e:any) => {
    e.preventDefault();
    // window.contract.add_crowdfund({title:title, donate:ntarget * 1, description:description}).then(() => {
    //   setShowNotification(!showNotification)
    // })
    toast.success('created susccess!', {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });

      toast.error('error!', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });

  }




  return (    
    <div className={`nc-PageDashboard ${className}`} data-nc-id="PageDashboard">
      <Head>
        <title>Dashboard || Create new campaigns</title>
      </Head>
      
      <LayoutPage
        heading="New campaign"
        subHeading=""
        headingEmoji="⚙"
        
      >
      <div className="flex flex-col">
      
        <form className="grid md:grid-cols-2 gap-6" onSubmit={handleSubmit} >
          <label className="block md:col-span-2">
            <Label>Title *</Label>
            <Input 
            type="text" 
            className="mt-1"  
            value={title}
            onChange={(e) => setTitle(e.target.value)} 
            />
          </label>
          <label className="block md:col-span-2">
            <Label>Excerpt</Label>
            <Textarea 
            className="mt-1" 
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            />
            <p className="mt-1 text-sm text-neutral-500">
              Brief description for your article. URLs are hyperlinked.
            </p>
          </label>
          <label className="block">
            <Label>Enter donation target:</Label>
            <Input
            type="number"
            className="mt-1"
            value={ntarget}
            onChange={(e) => setTarget(parseInt(e.target.value))}
            />
          </label>

          <label className="block md:col-span-2">
            <Label> Campaign Content</Label>

            <Textarea className="mt-1" rows={16} />
          </label>

          <ButtonPrimary className="md:col-span-2" type="submit">
            Submit campaign
          </ButtonPrimary>
        </form>
    
      </div>
      </LayoutPage>
      <ToastContainer />
    </div>
  );
};


export default PageDashboard;
