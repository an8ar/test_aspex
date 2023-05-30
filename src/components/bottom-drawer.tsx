import React from 'react';

import {
  Box, IconButton, styled, SwipeableDrawer, SwipeableDrawerProps, Typography,
} from '@mui/material';

import { Iconify } from './iconify';

type Props = Omit<SwipeableDrawerProps, 'onOpen'> & {
  children?: React.ReactNode;
  onClose?: VoidFunction;
  onOpen?: VoidFunction;
  title?: string
  hasCloser: boolean
  fullHeight?: boolean
};

export function BottomDrawer({
  children, onClose, onOpen, title, hasCloser, fullHeight, ...drawerProps
}: Props) {
  const handleOnOpen = () => {
    onOpen?.();
  };

  return (
    <DrawerStyle
      {...drawerProps}
      fullHeight={fullHeight as boolean}
      onClose={onClose}
      onOpen={handleOnOpen}
      anchor="bottom"
    >
      <HeaderBoxStyle>
        <HeaderBoxContentStyle>
          <Typography variant="h5">{title}</Typography>
        </HeaderBoxContentStyle>
        {hasCloser
        && (
        <IconButton onClick={() => onClose()}>
          <Iconify icon="material-symbols:close" sx={{ width: 24, height: 24 }} />
        </IconButton>
        )}
      </HeaderBoxStyle>
      <ContentStyle>{children}</ContentStyle>
    </DrawerStyle>
  );
}

interface DrawerStyleProps extends SwipeableDrawerProps {
  fullHeight: boolean;
}

const DrawerStyle = styled(SwipeableDrawer, {
  shouldForwardProp: (prop) => prop !== 'fullHeight',
})<DrawerStyleProps>(({ theme, fullHeight }) => ({
  '.MuiDrawer-paper': {
    borderTopRightRadius: theme.shape.borderRadius,
    borderTopLeftRadius: theme.shape.borderRadius,
    background: theme.palette.common.white,
    zIndex: 2,
    display: 'flex',
    flexDirection: 'column',
    paddingBottom: theme.spacing(3),
    ...(fullHeight && {
      height: '95vh',
    }),
  },
}));

const ContentStyle = styled(Box)(({ theme }) => ({
  paddingLeft: theme.spacing(3),
  paddingRight: theme.spacing(3),
  flex: 1,
}));

const HeaderBoxStyle = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(3),
}));

const HeaderBoxContentStyle = styled(Box)({
  flexGrow: 1,
});
