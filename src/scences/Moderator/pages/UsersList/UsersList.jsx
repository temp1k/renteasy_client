import PropTypes from 'prop-types';
import useDataAPI from "../../../../hook/useDataAPI.js";
import {getAllUsersAPI} from "../../api/usersAPI.js";
import {Container} from "react-bootstrap";
import {CenterLoading, CustomLinkButton, MyButton, MyTable} from "../../../../feutures/index.js";
import {TfiReload} from "react-icons/tfi";
import {formatJsonDateTo_ddMMyyyy} from "../../../../utils/helpers.js";
import {FaEye} from "react-icons/fa";
import {MyPagination, SearchInput} from "../../../../components/index.js";
import {useState} from "react";
import {MyContainer} from "../../../../feutures/MyContainer/index.js";

const TrUser = ({user, offset = 0, index}) => {
    return (
        <tr key={user.id} className={`tr-request`}>
            <td>{index + 1 + offset}</td>
            <td>{user.username}</td>
            <td>{user.email}</td>
            <td>{user.first_name + ' ' + user.last_name}</td>
            <td>{
                user.groups.map(role =>
                    <span key={role}>{role+' '}</span>
                )
            }</td>
            <td>{formatJsonDateTo_ddMMyyyy(user.date_joined)}</td>
            <td>{user.is_active ? 'Активен' : 'Заблокирован'}</td>
            <td>{user.is_success ? 'Подтвержден' : 'Не подтвержден'}</td>
            <td>
                <CustomLinkButton to={`${user.id}`}><FaEye/></CustomLinkButton>
            </td>
        </tr>
    );
}

TrUser.propTypes = {
    user: PropTypes.object,
    offset: PropTypes.number,
    index: PropTypes.number,
}

const UsersList = () => {
    const limit = 10
    const [search, setSearch] = useState('');
    const {
        data, updateData,
        error,
        loading, setLoading,
        count,
        offset, setOffset
    } = useDataAPI(limit, {search}, getAllUsersAPI)

    return (
        <MyContainer>
            <h4 style={{
                position: 'sticky'
            }}>Пользователи</h4>
            <div>
                <SearchInput search={search} setSearch={setSearch} />
            </div>

            <MyTable bordered>
                <thead>
                <tr>
                    <th>#</th>
                    <th>Логин</th>
                    <th>Почта</th>
                    <th>Имя</th>
                    <th>Роль</th>
                    <th>Дата регистрации</th>
                    <th>Активность пользователя</th>
                    <th>Подтвержденный аккаунт</th>
                    <th>
                        <MyButton
                            onClick={() => {
                                setLoading(true)
                                updateData()
                            }}
                            variant={'secondary'}
                        >
                            <TfiReload/>
                        </MyButton>
                    </th>
                </tr>
                {error}
                </thead>
                <tbody>
                {loading &&
                    <tr>
                        <td colSpan={10}><CenterLoading/></td>
                    </tr>
                }
                {data.map((user, index) =>
                    <TrUser key={user.id} user={user} offset={offset} index={index}/>
                )}
                </tbody>
            </MyTable>
            {count===0 &&
                <span>Ничего не найдено :(</span>
            }
            <MyPagination count={count} setOffset={setOffset} itemsPerPage={limit}/>
        </MyContainer>
    );
};

UsersList.propTypes = {

};

export default UsersList;