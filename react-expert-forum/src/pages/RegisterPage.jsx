import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { asyncRegisterUser } from '../states/authUser/action';
import RegisterInput from '../components/RegisterInput';
import { toast } from '../utils/toast';

function RegisterPage() {
  const authUser = useSelector((state) => state.authUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (authUser) {
      navigate('/');
    }
  }, [authUser, navigate]);

  const onRegister = async ({ name, email, password }) => {
    try {
      await dispatch(asyncRegisterUser({ name, email, password }));
      toast.success('Pendaftaran berhasil! Silakan login dengan akun baru Anda.');
      navigate('/login');
    } catch {
      // Error handled inside thunk or toast
    }
  };

  return (
    <div className="py-8 space-y-4">
      <RegisterInput register={onRegister} />
      <p className="text-center text-sm text-muted-foreground">
        Sudah punya akun?{' '}
        <Link to="/login" className="font-semibold text-primary hover:underline">
          Masuk di sini
        </Link>
      </p>
    </div>
  );
}

export default RegisterPage;
