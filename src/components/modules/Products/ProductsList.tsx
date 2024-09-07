import { useEffect, useRef, useState } from 'react';
import { useAppDispatch } from '../../../store/store';
import { getLimitProducts } from '../../../store/apiProducts/asyncActions';
import { useSelector } from 'react-redux';
import { selectApiProductsData } from '../../../store/apiProducts/selectors';
import ApiProductItem from './ApiProductItem';
import {
  Box,
  Button,
  ButtonGroup,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  Typography,
} from '@mui/material';
import BreadcrumbsComponent from '../../BreadcrumbsComponent/BreadcrumbsComponent';
import { selectFormProductsFiltered } from '../../../store/formProducts/selectors';
import FormProductItem from './FormProductItem';
import { useSearchParams } from 'react-router-dom';

export default function ProductsList() {
  const dispatch = useAppDispatch();
  const [numberProducts, setNumberProducts] = useState<number>(8);
  const [selectedList, setSelectedList] = useState('apiItems');
  const { items: apiItems } = useSelector(selectApiProductsData);
  const [showPublished, setShowPublished] = useState(true);
  const [sortBy, setSortBy] = useState('price-asc');
  const formItems = useSelector((state) =>
    selectFormProductsFiltered(state, numberProducts, sortBy, showPublished),
  );
  const [searchParams, setSearchParams] = useSearchParams();
  const isFirstRender = useRef(true);

  useEffect(() => {
    dispatch(getLimitProducts({ numberProducts, sortBy }));
  }, [numberProducts, dispatch, sortBy]);

  useEffect(() => {
    if (isFirstRender.current) {
      const getSelected = searchParams.get('selected');
      const getNumberProducts = searchParams.get('numberProducts');
      const getShowPublished = searchParams.get('published');
      const getSortBy = searchParams.get('sort');
      const convertShowPublished = getShowPublished === 'true' ? true : false;

      if (getSelected) {
        setSelectedList(getSelected);
      } else {
        setSearchParams({ selected: selectedList });
      }

      if (getNumberProducts) {
        setNumberProducts(+getNumberProducts);
      } else {
        setSearchParams({ numberProducts: numberProducts.toString() });
      }

      if (getSortBy) {
        setSortBy(getSortBy);
      } else {
        setSearchParams({ sort: sortBy });
      }

      if (getShowPublished) {
        setShowPublished(convertShowPublished);
      } else {
        setSearchParams({ published: getShowPublished! });
      }
    }

    isFirstRender.current = false;
    return () => {
      isFirstRender.current = true;
    };
  }, []);

  useEffect(() => {
    setSearchParams({
      selected: selectedList,
      published: showPublished.toString(),
      numberProducts: numberProducts.toString(),
      sort: sortBy,
    });
  }, [selectedList, showPublished, numberProducts, sortBy]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <ButtonGroup
        variant='contained'
        aria-label='Basic button group'
        sx={{ width: '100%', height: '70px', display: 'flex', alignItems: 'center' }}>
        <BreadcrumbsComponent />
        <Typography
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            marginLeft: '20px',
            marginRight: '20px',
          }}>
          Number of products :
        </Typography>
        <Button
          onClick={() => setNumberProducts(8)}
          sx={{ height: '100%', width: '50px', borderRadius: '0' }}>
          8
        </Button>
        <Button onClick={() => setNumberProducts(16)} sx={{ height: '100%', width: '50px' }}>
          16
        </Button>
        <Button
          onClick={() => setNumberProducts(20)}
          sx={{ height: '100%', width: '50px', borderRadius: '0' }}>
          20
        </Button>

        <FormControl sx={{ marginLeft: '50px' }}>
          <InputLabel id='demo-simple-select-label'>Product type</InputLabel>
          <Select
            variant='outlined'
            label='Product type'
            value={selectedList}
            onChange={(e) => setSelectedList(e.target.value)}>
            <MenuItem value={'apiItems'}>Api Products</MenuItem>
            <MenuItem value={'formItems'}>Form Products</MenuItem>
          </Select>
        </FormControl>

        {selectedList === 'formItems' ? (
          <FormControlLabel
            sx={{ marginLeft: '50px' }}
            onChange={() => setShowPublished(!showPublished)}
            control={<Switch checked={showPublished} />}
            label='Published'
          />
        ) : (
          ''
        )}

        <FormControl sx={{ marginLeft: '50px' }}>
          <InputLabel id='demo-simple-select-label'>Sort by</InputLabel>
          <Select
            variant='outlined'
            label='Sort by'
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}>
            <MenuItem value={'price-asc'}>Price (low to high)</MenuItem>
            <MenuItem value={'price-desc'}>Price (hight to low)</MenuItem>
            <MenuItem value={'title-asc'}>Title (A to Z)</MenuItem>
            <MenuItem value={'title-desc'}>Title (Z to A)</MenuItem>
          </Select>
        </FormControl>
      </ButtonGroup>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {selectedList === 'formItems'
          ? formItems.map((item) => <FormProductItem key={item.id} product={item} />)
          : apiItems.map((item) => <ApiProductItem key={item.id} product={item} />)}
      </Box>
    </Box>
  );
}
