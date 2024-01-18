import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import ProfileUser from '../components/ProfileUser/ProfileUser';

const ProfileUserPage = () => {
    return (
        <div style={{ backgroundColor: '#EFEFEF' }}>
            <Header />
            <ProfileUser />
            <Footer />
        </div>
    );
}

export default ProfileUserPage;