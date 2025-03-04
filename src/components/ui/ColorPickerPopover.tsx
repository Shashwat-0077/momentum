import React from "react";
import { RgbaColorPicker } from "react-colorful";
import { Trash2 } from "lucide-react";

import { cn } from "@/lib/utils";

import { Input } from "./input";
import { Label } from "./label";
import { Button } from "./button";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

type ColorPickerPopoverProps =
    | {
          children: React.ReactNode;
          isSingleColor: false;
          className?: string;
          colorIndex: number;
          removeColor: (index: number) => void;
          color: { r: number; g: number; b: number; a: number };
          setColor: (
              color: {
                  r: number;
                  g: number;
                  b: number;
                  a: number;
              },
              index: number
          ) => void;
          enableAlpha?: boolean;
      }
    | {
          children: React.ReactNode;
          isSingleColor: true;
          colorIndex?: never;
          className?: string;
          removeColor?: never;
          color: { r: number; g: number; b: number; a: number };
          setColor: (color: {
              r: number;
              g: number;
              b: number;
              a: number;
          }) => void;
          enableAlpha?: boolean;
      };

export default function ColorPickerPopover({
    children,
    color,
    setColor,
    className,
    colorIndex,
    removeColor,
    isSingleColor,
    enableAlpha = true,
}: ColorPickerPopoverProps) {
    return (
        <Popover>
            <PopoverTrigger className={cn("w-full", className)}>
                {children}
            </PopoverTrigger>
            <PopoverContent
                sideOffset={10}
                className="grid w-64 place-content-center rounded-xl bg-background-light py-7"
            >
                <RgbaColorPicker
                    className="mx-auto pb-5"
                    color={color}
                    onChange={(color) => {
                        if (isSingleColor) {
                            setColor(color);
                        } else {
                            setColor(color, colorIndex);
                        }
                    }}
                />
                <div className="grid grid-cols-[0.2fr_1fr] gap-2">
                    <Label className="grid place-content-center">R : </Label>
                    <Input
                        type="number"
                        value={color.r !== -Number.MIN_VALUE ? color.r : ""}
                        onChange={(e) => {
                            const c = parseInt(e.target.value);
                            if (isSingleColor) {
                                setColor({
                                    ...color,
                                    r: isNaN(c)
                                        ? -Number.MIN_VALUE
                                        : c > 255
                                          ? 255
                                          : c,
                                });
                            } else {
                                setColor(
                                    {
                                        ...color,
                                        r: isNaN(c)
                                            ? -Number.MIN_VALUE
                                            : c > 255
                                              ? 255
                                              : c,
                                    },
                                    colorIndex
                                );
                            }
                        }}
                    />
                    <Label className="grid place-content-center">G : </Label>
                    <Input
                        type="number"
                        value={color.g !== -Number.MIN_VALUE ? color.g : ""}
                        onChange={(e) => {
                            const c = parseInt(e.target.value);
                            if (isSingleColor) {
                                setColor({
                                    ...color,
                                    g: isNaN(c)
                                        ? -Number.MIN_VALUE
                                        : c > 255
                                          ? 255
                                          : c,
                                });
                            } else {
                                setColor(
                                    {
                                        ...color,
                                        g: isNaN(c)
                                            ? -Number.MIN_VALUE
                                            : c > 255
                                              ? 255
                                              : c,
                                    },
                                    colorIndex
                                );
                            }
                        }}
                    />
                    <Label className="grid place-content-center">B : </Label>
                    <Input
                        type="number"
                        value={color.b !== -Number.MIN_VALUE ? color.b : ""}
                        onChange={(e) => {
                            const c = parseInt(e.target.value);
                            if (isSingleColor) {
                                setColor({
                                    ...color,
                                    b: isNaN(c)
                                        ? -Number.MIN_VALUE
                                        : c > 255
                                          ? 255
                                          : c,
                                });
                            } else {
                                setColor(
                                    {
                                        ...color,
                                        b: isNaN(c)
                                            ? -Number.MIN_VALUE
                                            : c > 255
                                              ? 255
                                              : c,
                                    },
                                    colorIndex
                                );
                            }
                        }}
                    />
                    {enableAlpha && (
                        <>
                            <Label className="grid place-content-center">
                                A :{" "}
                            </Label>
                            <Input
                                type="number"
                                value={
                                    color.a === -Number.MIN_VALUE ? "" : color.a
                                }
                                onChange={(e) => {
                                    const a = parseInt(e.target.value);

                                    if (isSingleColor) {
                                        setColor({
                                            ...color,
                                            a: isNaN(a)
                                                ? -Number.MIN_VALUE
                                                : a > 1
                                                  ? 1
                                                  : a,
                                        });
                                    } else {
                                        setColor(
                                            {
                                                ...color,
                                                a: isNaN(a)
                                                    ? -Number.MIN_VALUE
                                                    : a > 1
                                                      ? 1
                                                      : a,
                                            },
                                            colorIndex
                                        );
                                    }
                                }}
                            />
                        </>
                    )}

                    {!isSingleColor && (
                        <Button
                            className="col-span-2 flex items-center justify-center border border-primary bg-transparent text-primary hover:bg-primary/20"
                            variant={"outline"}
                            onClick={() => {
                                removeColor(colorIndex);
                            }}
                        >
                            <Trash2 />
                            <span className="h-4">Remove</span>
                        </Button>
                    )}
                </div>
            </PopoverContent>
        </Popover>
    );
}
