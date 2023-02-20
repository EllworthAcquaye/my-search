import Navbar from '@/components/navbar';
import Multiselect from 'multiselect-react-dropdown';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import data from '../utils/data';

export default function Home() {
  const router = useRouter();
  const [searchValues, setSearchValues] = useState([] as any);
  const [open, setOpen] = useState(false);
  const [filterType, setFilterType] = useState('');

  let separatedArray: any[] = [];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { orders } = await data;
      } catch (error) {}
    };
    fetchData();
    console.log(searchValues);
  }, [setSearchValues, setFilterType]);

  const filterItemNo = (e: any) => {
    e.preventDefault();

    if (e.target.value !== null) {
      separatedArray = (e.target.value as string).split(',');

      console.log(separatedArray);

      console.log(searchValues);
      const arr: any[] = [];

      separatedArray.forEach((c) => {
        let val = c.trim();
        let x = data.orders.filter((item) => {
          return item.item_no.includes(val);
        });

        x.map((test) => {
          arr.push(test);
        });
      });
      setSearchValues(arr);
    }
    console.log(searchValues.length);
  };
  const filterOrder = (e: any) => {
    e.preventDefault();

    if (e.target.value !== null) {
      separatedArray = (e.target.value as string).split(',');

      console.log(separatedArray);

      console.log(searchValues);
      const arr: any[] = [];

      separatedArray.forEach((c) => {
        let val = c.trim();
        let x = data.orders.filter((item) => {
          return item.order_no.includes(val);
        });

        x.map((test) => {
          arr.push(test);
        });
      });
      setSearchValues(arr);
    }
    console.log(searchValues.length);
  };

  const onSelect = (selectedList: any, selectedItem: any) => {
    console.log(selectedList);
    const arr: any[] = [];

    for (const sel of selectedList) {
      let x = data.orders.filter((item) => {
        return item.type.includes(sel);
      });
      x.map((test) => {
        arr.push(test);
      });
    }
    setSearchValues(arr);
  };

  const onRemove = (selectedList: any, selectedItem: any) => {
    let arr: any[] = [];

    console.log(searchValues);
    for (const iterator of searchValues) {
      arr = searchValues.filter((item: any) => {
        return item.type !== selectedItem;
      });
    }
    setSearchValues(arr);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="inline-flex">
        <input
          onChange={(e) => filterItemNo(e)}
          className="mt-10 rounded-full bg-slate-50 text-sm font-normal h-10 px-2 pl-4 w-[700px] focus:outline-0 "
          placeholder="Search"
        />
        <button
          onClick={() => {
            setOpen(!open);
          }}
          className="btn-primary mt-11 ml-4"
        >
          Filter
        </button>
      </div>
      {open && (
        <div className="bg-gray-50 h-screen fixed w-1/6 z-10 top-0 right-0 pt-10 px-10">
          <h1>Filter by type</h1>

          <Multiselect
            isObject={false}
            onKeyPressFn={function noRefCheck() {}}
            onRemove={onRemove}
            onSearch={function noRefCheck() {}}
            onSelect={onSelect}
            options={['EDF', 'CAO', 'SFO']}
          />
          <div className="mt-10">
            <label htmlFor="orderno">Filter by order</label>
            <textarea
              id="orderno"
              className="input-primary h-24 w-40 mt-2"
              onChange={(e: any) => filterOrder(e)}
            />
          </div>
        </div>
      )}

      {searchValues.length == 0 && <h1 className="mt-20">Nothing to show</h1>}

      <div className="flex overflow-x-auto ">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4 mt-10 ml-20">
          {searchValues.length > 0 && (
            <table className="w-[1000px]">
              <thead className="bproduct-b">
                <tr>
                  <th className="px-5 text-left">ITEM NO.</th>
                  <th className="px-5 text-left">ORDER NO.</th>
                  <th className="p-5 text-left">TYPE</th>
                  <th className="p-5 text-left">DESCRIPTION</th>
                  <th className="p-5 text-left">DATE CREATED</th>
                </tr>
              </thead>

              <tbody className="text-center">
                {searchValues.map((item: any, index: number) => (
                  <tr key={index}>
                    <td>{item?.item_no}</td>
                    <td>{item?.order_no}</td>
                    <td>{item?.type}</td>
                    <td>{`${item?.description?.substring(0, 20)} ...`}</td>
                    <td>{item?.created_on}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
