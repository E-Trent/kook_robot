"use client";
import LoggerList from "../../ui/LoggerList";
import { useCallback, useEffect, useRef, useState } from "react";
import { LoggerItem } from "logger";
import { fetchEvents } from "server";
import { motion } from "framer-motion";
const DELAY = 200;

const Page = (props: {
  params: { logger: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  useEffect(() => {
    fetch("https://kook-web.vercel.app/api/webhook", { method: "post" });
  }, []);
  const path = props.params.logger;
  const [ready, setReady] = useState(false);
  const [current, setCurrent] = useState<LoggerItem[]>([]);
  const [prefix, setPrefix] = useState<LoggerItem[]>([]);
  const [append, setAppend] = useState<LoggerItem[]>([]);
  const [hasPrefix, setHasPrefix] = useState(false);
  const [oldGroup, setOldGroup] = useState<number[]>([]);
  const backup = useRef<LoggerItem[]>([]);
  const loadMore = useCallback(async () => {
    if (!ready) return;
    const searchParams = new URLSearchParams();
    searchParams.set("after", `${current.at(-1)?.id || ""}`);
    searchParams.set("prefix", `${current.at(0)?.id || ""}`);
    const data = await fetch(`/api/get-${path}?${searchParams}`).then(
      (res) => res.json() as ReturnType<typeof fetchEvents>
    );
    setHasPrefix(!!data.prefix.length);
    setPrefix(data.prefix);
    setAppend(data.append);
    backup.current = current;
    if (data.append.length === 0 && data.prefix.length === 0) {
      setOldGroup(backup.current.map((i) => i.id));
    }
  }, [current, path, ready]);
  useEffect(() => {
    if (append.length === 0 && prefix.length === 0) {
      let timer = setTimeout(() => {
        setOldGroup(backup.current.map((i) => i.id));
      }, DELAY);
      return () => {
        timer && clearTimeout(timer);
      };
    }
  }, [append.length, prefix.length]);
  useEffect(() => {
    if (append.length && !hasPrefix) {
      let timer = setTimeout(() => {
        setCurrent((current) => [...current, append.at(0)]);
        setAppend((append) => append.slice(1));
      }, DELAY);
      return () => {
        timer && clearTimeout(timer);
      };
    }
  }, [append, hasPrefix]);

  useEffect(() => {
    if (prefix.length) {
      setCurrent((current) => [...prefix, ...current]);
      setPrefix([]);
      return () => {
        setHasPrefix(false);
      };
    }
  }, [append.length, current, prefix]);
  useEffect(() => {
    setReady(true);
  }, []);
  useEffect(() => {
    loadMore();
    return () => {
      setReady(false);
    };
  }, [loadMore]);

  return (
    <>
      <LoggerList
        data={current}
        delay={DELAY / 1000}
        hasPrefix={hasPrefix}
        oldGroup={oldGroup}
      />
      <div className="flex justify-center">
        {append.length === 0 && prefix.length === 0 && (
          <motion.button
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.8 }}
            className="px-2.5 py-1.5 text-sm hover:text-white"
            onClick={() => setReady(true)}
          >
            Load more
          </motion.button>
        )}
      </div>
    </>
  );
};
export default Page;
