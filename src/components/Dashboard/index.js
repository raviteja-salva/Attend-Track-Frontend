import './index.css'
import {FaBell} from 'react-icons/fa'
import Cookies from 'js-cookie'
import {useState} from 'react'
import {
  PieChart,
  Pie,
  Legend,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
} from 'recharts'

const students = [
  {sNo: 1, name: 'Emily', gender: 'Female', attendance: 'Present'},
  {sNo: 2, name: 'Ravi', gender: 'Male', attendance: 'Present'},
  {sNo: 3, name: 'Siva', gender: 'Male', attendance: 'Present'},
  {sNo: 4, name: 'Raj', gender: 'Male', attendance: 'Present'},
  {sNo: 5, name: 'Hemanth', gender: 'Male', attendance: 'Absent'},
  {sNo: 6, name: 'Pravalika', gender: 'Female', attendance: 'Present'},
  {sNo: 7, name: 'Sujatha', gender: 'Female', attendance: 'Present'},
  {sNo: 8, name: 'Indraja', gender: 'Female', attendance: 'Present'},
  {sNo: 9, name: 'Krishna', gender: 'Male', attendance: 'Present'},
  {sNo: 10, name: 'Madhu', gender: 'Female', attendance: 'Present'},
  {sNo: 11, name: 'Kavya', gender: 'Female', attendance: 'Present'},
  {sNo: 12, name: 'Kaja', gender: 'Male', attendance: 'Present'},
  {sNo: 13, name: 'Nurjahan', gender: 'Female', attendance: 'Absent'},
  {sNo: 14, name: 'Somesh', gender: 'Male', attendance: 'Present'},
  {sNo: 15, name: 'Akshaya', gender: 'Female', attendance: 'Present'},
  {sNo: 16, name: 'Lily', gender: 'Male', attendance: 'Absent'},
]

const todayData = [
  {
    count: 6,
    category: 'Present Boys',
  },
  {
    count: 7,
    category: 'Present Girls',
  },
  {
    count: 2,
    category: 'Absent Boys',
  },
  {
    count: 1,
    category: 'Absent Girls',
  },
]

const weeklyData = [
  {
    group_name: 'Mon',
    boys: 8,
    girls: 8,
  },
  {
    group_name: 'Tue',
    boys: 9,
    girls: 7,
  },
  {
    group_name: 'Wed',
    boys: 4,
    girls: 6,
  },
  {
    group_name: 'Thu',
    boys: 8,
    girls: 8,
  },
  {
    group_name: 'Fri',
    boys: 6,
    girls: 8,
  },
  {
    group_name: 'Sat',
    boys: 7,
    girls: 6,
  },
]

const Dashboard = props => {
  const [searchInput, setSearchInput] = useState('')

  document.title = 'Attend Track'

  const changeSearchInput = event => {
    setSearchInput(event.target.value)
  }

  const studentsList = students.filter(eachStudent =>
    eachStudent.name.toLowerCase().includes(searchInput.toLowerCase()),
  )

  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  const renderNavbar = () => (
    <nav className="nav-bar">
      <h1 className="home-heading">Attend Track</h1>
      <div className="nav-items">
        <input
          type="search"
          placeholder="Search for students.."
          className="search-bar"
          value={searchInput}
          onChange={changeSearchInput}
        />
        <FaBell className="bell-icon" />
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
          className="profile"
        />
        <button className="logout-btn" onClick={onClickLogout}>
          Logout
        </button>
      </div>
    </nav>
  )

  const renderStudentsTable = () => (
    <div className="table-container">
      <h1 className="dashboard-heading">Students List</h1>
      <table className="students-table">
        <thead className="students-table">
          <tr>
            <th>S No</th>
            <th>Name</th>
            <th>Gender</th>
            <th>Attendance</th>
          </tr>
        </thead>
        <tbody className="students-table">
          {studentsList.map(student => (
            <tr key={student.sNo}>
              <td>{student.sNo}</td>
              <td>{student.name}</td>
              <td>{student.gender}</td>
              <td>{student.attendance}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )

  const renderPieChart = () => (
    <div className="pie-chart-container">
      <h1 className="dashboard-heading">Today Attendance</h1>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart className="pie-chart">
          <Pie
            cx="70%"
            cy="40%"
            data={todayData}
            startAngle={0}
            endAngle={360}
            innerRadius="0%"
            outerRadius="70%"
            dataKey="count"
          >
            <Cell name="Present Boys" fill="#347bff" />
            <Cell name="Present Girls" fill="#fd0606" />
            <Cell name="Absent Boys" fill="#b5c3ff" />
            <Cell name="Absent Girls" fill="#ff9090" />
          </Pie>
          <Legend
            iconType="circle"
            layout="vertical"
            verticalAlign="middle"
            align="right"
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )

  const renderBarChart = () => (
    <div className="pie-chart-container">
      <h1 className="dashboard-heading">Last Week Attendance</h1>
      <ResponsiveContainer width="100%" height={500}>
        <BarChart
          data={weeklyData}
          margin={{
            top: 5,
          }}
        >
          <XAxis
            dataKey="group_name"
            tick={{
              stroke: 'gray',
              strokeWidth: 1,
            }}
          />
          <YAxis
            tick={{
              stroke: 'gray',
              strokeWidth: 0,
            }}
          />
          <Legend
            wrapperStyle={{
              padding: 30,
            }}
          />
          <Bar dataKey="boys" name="Boys" fill="#347bff" barSize="10%" />
          <Bar dataKey="girls" name="Girls" fill="#fd0606" barSize="10%" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )

  return (
    <div>
      {renderNavbar()}
      <div className="charts-table-container">
        {renderStudentsTable()}
        <div className="charts-container">
          {renderPieChart()}
          {renderBarChart()}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
