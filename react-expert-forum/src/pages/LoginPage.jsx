import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { asyncSetAuthUser } from '../states/authUser/action';
import LoginInput from '../components/LoginInput';

function LoginPage() {
  const authUser = useSelector((state) => state.authUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (authUser) {
      navigate('/');
    }
  }, [authUser, navigate]);

  const onLogin = ({ email, password }) => {
    dispatch(asyncSetAuthUser({ email, password }));
  };

  return (
    <div className="py-8 space-y-4">
      <LoginInput login={onLogin} />
      <p className="text-center text-sm text-muted-foreground">
        Belum punya akun?{' '}
        <Link to="/register" className="font-semibold text-primary hover:underline">
          Daftar di sini
        </Link>
      </p>
    </div>
  );
}

export default LoginPage;
