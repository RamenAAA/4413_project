
function Profile(){
    return(
        <div className="profile">
            <div className="profileInfo">
                <h2 className="pageHeader">Profile</h2>
                <p>Name: John Smith</p>
                <p>Email: john.smith@email.com</p>
                <p>Billing Address: 123 Apple Street</p>
                <p>Shipping Address: 123 Apple Street</p>
            </div>

            <div className="purchaseHistory">
                <h3 className="purchaseHistoryLabel">Purchase History</h3>
                <p>Shirt 1</p>
                <p>Shirt 2</p>
            </div>



        </div>
        
    );
}

export default Profile