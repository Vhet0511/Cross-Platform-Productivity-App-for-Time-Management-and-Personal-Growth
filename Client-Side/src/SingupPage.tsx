interface SignupPageProps {
    goToLogin: () => void;
  }
  
  export default function SignupPage({ goToLogin }: SignupPageProps) {
    return (
      <div className="p-6 max-w-sm mx-auto mt-20 bg-white shadow rounded">
        <h2 className="text-2xl font-bold mb-4">Signup</h2>
  
        <input type="email" placeholder="Email" className="w-full border p-2 mb-2" />
        <input type="password" placeholder="Password" className="w-full border p-2 mb-2" />
        <input type="password" placeholder="Confirm Password" className="w-full border p-2 mb-2" />
  
        <button className="bg-green-600 text-white w-full py-2 rounded hover:bg-green-700">
          Register
        </button>
  
        <p className="text-sm text-center mt-4">
          Already have an account?{' '}
          <button onClick={goToLogin} className="text-blue-600 hover:underline">
            Login here
          </button>
        </p>
      </div>
    );
  }
  