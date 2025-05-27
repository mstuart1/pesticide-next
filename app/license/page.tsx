// import { auth } from "@/auth"
import { redirect } from "next/navigation";


const LicensePage = () => {

    const user = localStorage.getItem("pesticideUser") ? JSON.parse(localStorage.getItem("pesticideUser")!) : null;
    if (!user) {redirect("/login");}

  return (
  <div>
          {/* user info */}
          <div className={`flex flex-col items-start justify-center my-2 mx-4 gap-4 overflow-x-clip`}>
            <span className={`text-xl text-left block my-2`}>Please take a moment to verify your information.</span>
             <span>License: {user?.license}</span>

            {/*<Input className={styles.input} type='text' disabled value={currentUser?.name} onChange={(e) => setCurrentUser({ ...currentUser, name: e.target.value })} placeholder='Name' />

            <SingleInputForm defaultValue={currentUser?.email} handleSave={handleSaveEmail} placeholder='Eamil' type='email' />
            
            <AssociatedLicenseElement currentUser={currentUser} setCurrentUser={setCurrentUser} editUser={editUser} setEditUser={setEditUser} /> */}
          </div>

          {/* <div className={styles.buttonContainer}>

            <Button onClick={() => {
              setCurrentUser({ ...user, updatedAt: new Date().toISOString() });
              handleUpdate();
            }} className={styles.surveyButton}>This infomation is correct</Button>
              
            

          </div> */}
        </div>
  )
}

export default LicensePage