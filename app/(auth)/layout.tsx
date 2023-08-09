const AuthLayout = ({
    children
  }: {
    children: React.ReactNode;
  }) => {
    return ( 
     <div className="flex justify-center items-center h-full mt-24">{children}</div>
    );
  }
   
  export default AuthLayout;